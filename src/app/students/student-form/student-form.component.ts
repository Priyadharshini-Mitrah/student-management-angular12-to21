import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss'],
    standalone: false
})
export class StudentFormComponent implements OnInit {
studentForm: FormGroup;
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name:   ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      age:    [null, [Validators.required, Validators.min(16)]],
      course: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.isEditMode = true;
      const student = this.studentService.getStudent(this.studentId);
      if (student) {
        this.studentForm.patchValue(student);
      }
    }
  }

  save(): void {
    if (this.studentForm.invalid) return;

    const value = this.studentForm.value;

    if (this.isEditMode && this.studentId !== undefined) {
      this.studentService.updateStudent({ ...value, id: this.studentId });
    } else {
      this.studentService.addStudent(value);
    }

    this.router.navigate(['/students']);
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
