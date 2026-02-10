import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../shared/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-student-detail',
    templateUrl: './student-detail.component.html',
    styleUrls: ['./student-detail.component.scss'],
    standalone: false
})
export class StudentDetailComponent implements OnInit {
student?: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.studentService.getStudent(id);
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
