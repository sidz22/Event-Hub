import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  standalone : false
})
export class EventsComponent implements OnInit 
{
  admissionForm!: FormGroup;
  submitted = false;
  events : any[] = []
  selectedEvent: any;

  constructor(private _eventService: EventService,private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.admissionForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      education: ['', Validators.required],
      college: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.fetchEvents();
      
    setTimeout(() => {
      const successModalEl = document.getElementById('successModal');
      if (successModalEl) {
        successModalEl.addEventListener('hidden.bs.modal', () => {
          this.fetchEvents(); // Reload events when modal is closed
        });
      }
    }, 0);

      this._eventService.getEvents()
        .subscribe(
          res => this.events = res,
          err => console.log(err)
        );
    }

    fetchEvents() {
      this.http.get<any[]>('http://localhost:3000/api/events').subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (err) => {
          console.error('Failed to load events:', err);
        }
      });
    }
    
    openForm(event: any): void {
      this.selectedEvent = event;
      this.admissionForm.reset(); // optional: reset form each time modal opens
    }


  get f() {
    return this.admissionForm.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.admissionForm.invalid) {
      return;
    }

    // Replace this with your actual API path from api.js
    const API_URL = 'http://localhost:3000/api/admission'; // example

    this.http.post(API_URL, this.admissionForm.value).subscribe({
      next: (res) => {
        // Reset form
        this.admissionForm.reset();
        this.submitted = false;
  
        // Close Admission Form Modal
        const admissionModalEl = document.getElementById('admissionModal');
        if (admissionModalEl) {
          const admissionModal = (bootstrap as any).Modal.getInstance(admissionModalEl);
          if (admissionModal) {
            admissionModal.hide();
          }
        }
  
      // Delay before opening Success Modal
      setTimeout(() => {
        const successModalEl = document.getElementById('successModal');
        if (successModalEl) {
          const successModal = new (bootstrap as any).Modal(successModalEl);
          successModal.show();
          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach((el) => el.remove());

        } else {
          alert('Admission form submitted successfully!');
          this.fetchEvents(); // fallback
        }
      }, 500);

      },
      error: (err) => {
        console.error(err);
        alert("Failed to submit form. Try again later.");
      }
    });
  }
}
