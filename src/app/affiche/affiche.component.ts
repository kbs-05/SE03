import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-affiche',
  standalone: false,
  templateUrl: './affiche.component.html',
  styleUrl: './affiche.component.css'
})
export class AFFICHEComponent implements OnInit {
 studentData: any;
  pin: string = '';
  isAuthenticated: boolean = false;
  correctPin: string = '123456'; // Code PIN à 6 chiffres (à sécuriser en production)
  status: string = '';

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentData = JSON.parse(atob(params['id']));
    });
  }

  verifyPin() {
    if (this.pin === this.correctPin) {
      this.isAuthenticated = true;
    } else {
      alert('Code PIN incorrect');
    }
  }

  async markPresence(status: string) {
    try {
      const presenceRef = doc(
        collection(this.firestore, 'Presences'),
        `${this.studentData.matricule}_${new Date().toISOString()}`
      );
      await setDoc(presenceRef, {
        student: this.studentData,
        status: status,
        timestamp: new Date()
      });
      this.status = status;
      alert(`Statut marqué : ${status}`);
    } catch (error) {
      console.error('Error marking presence:', error);
    }
  }
}