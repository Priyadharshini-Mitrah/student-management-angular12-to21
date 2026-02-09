import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  private readonly API = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
    this.loadMockStudents();
  }

  private loadMockStudents() {
    this.http.get<any[]>(this.API).pipe(
      map(users => users.map((u, index) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        age: 17 + Math.floor(Math.random() * 18), // 17–34 range
        course: ['BCA', 'MCA', 'BSc CS', 'MSc IT', 'BTech'][index % 5]
      })))
    ).subscribe({
      next: data => this.studentsSubject.next(data),
      error: () => this.studentsSubject.next([])
    });
  }

  getStudent(id: number): Student | undefined {
    return this.studentsSubject.value.find(s => s.id === id);
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const current = this.studentsSubject.value;
    const newId = Math.max(0, ...current.map(s => s.id)) + 1;
    this.studentsSubject.next([...current, { ...student, id: newId }]);
  }

  updateStudent(student: Student): void {
    const current = this.studentsSubject.value.map(s =>
      s.id === student.id ? student : s
    );
    this.studentsSubject.next(current);
  }

  deleteStudent(id: number): void {
    const current = this.studentsSubject.value.filter(s => s.id !== id);
    this.studentsSubject.next(current);
  }
}