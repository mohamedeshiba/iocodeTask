import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Register the Material Design icon
    this.iconRegistry.addSvgIcon(
      'close',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/close.svg')
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    // TODO: Implement save changes logic
  }
}
