import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, delay, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category'];


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog) {
    this.courses$ = coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Error on load Courses.')
        return of([])
      })
    );
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}

