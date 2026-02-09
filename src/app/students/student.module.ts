import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentComponent } from './student.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ChartModule } from 'primeng/chart';
import { StudentsRoutingModule } from './students-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
// import { FloatLabelModule } from 'primeng/floatlabel';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { AgePipe } from '../shared/pipes/age.pipe';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFormComponent,
    StudentDetailComponent,
    StudentListComponent,
    HighlightDirective,
    AgePipe

  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ChartModule

  ]
})
export class StudentModule { }
