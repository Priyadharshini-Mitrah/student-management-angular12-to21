import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentComponent } from './student.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

const routes: Routes = [
 {
    path: '',
    component: StudentComponent,
    children: [
      { path: '', component: StudentListComponent },
      { path: 'add', component: StudentFormComponent, canDeactivate: [UnsavedChangesGuard] },
      { path: 'edit/:id', component: StudentFormComponent, canDeactivate: [UnsavedChangesGuard] },
      { path: 'detail/:id', component: StudentDetailComponent },
    ]
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}