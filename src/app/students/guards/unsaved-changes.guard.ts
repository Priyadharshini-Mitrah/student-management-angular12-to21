import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentFormComponent } from '../student-form/student-form.component';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<StudentFormComponent> {
  canDeactivate(component: StudentFormComponent): boolean | Observable<boolean> {
    if (component.studentForm?.dirty || component.studentForm.invalid) {
      return confirm('You have unsaved changes.\nLeave anyway?');
    }
    return true;
  }
}