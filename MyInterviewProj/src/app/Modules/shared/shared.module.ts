import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {
  
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatIconModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatRadioModule 
} from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule,  
    NgxPaginationModule,
    ToastrModule.forRoot() 
  ],

  declarations: [DeleteDialogComponent],
  exports:[
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteDialogComponent]
})
export class SharedModule { }
