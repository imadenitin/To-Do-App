import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from 'src/app/model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoform !: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoform = this.fb.group({
      item: ['', Validators.required]
    })
  }
  addTask() {
    this.tasks.push({
      description: this.todoform.value.item,
      done: false
    });
    this.todoform.reset();
  }
  onEdit(item: ITask, i: number) {
    this.todoform.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.tasks[this.updateIndex].description = this.todoform.value.item
    this.tasks[this.updateIndex].done = false;
    this.todoform.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1)
  }
  deleteInprogress(i: number) {
    this.inprogress.splice(i, 1)
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
