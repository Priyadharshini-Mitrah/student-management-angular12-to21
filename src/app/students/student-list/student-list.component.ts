import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student, StudentService } from 'src/app/shared/services/student.service';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
    standalone: false
})
export class StudentListComponent implements OnInit {
students: Student[] = [];

chartData: any;          // ← for <p-chart>
  chartOptions: any;       // ← styling

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.students$.subscribe(list => {
      this.students = list;
      this.prepareAgeChart(list);   // ← new
    });
  }

  // New method: prepare simple bar chart (age groups)
  private prepareAgeChart(students: Student[]) {
    const ageGroups = {
      '16-18': 0,
      '19-21': 0,
      '22-24': 0,
      '25+': 0
    };

    students.forEach(s => {
      if (s.age <= 18) ageGroups['16-18']++;
      else if (s.age <= 21) ageGroups['19-21']++;
      else if (s.age <= 24) ageGroups['22-24']++;
      else ageGroups['25+']++;
    });

    this.chartData = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Number of Students',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          data: Object.values(ageGroups)
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Student Age Distribution' }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  addNew(): void {
    this.router.navigate(['/students/add']);
  }

  view(id: number): void {
    this.router.navigate(['/students/detail', id]);
  }

  edit(id: number): void {
    this.router.navigate(['/students/edit', id]);
  }

  remove(id: number): void {
    if (confirm('Delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

}
