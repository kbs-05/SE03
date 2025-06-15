import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enregistre',
  standalone: false,
  templateUrl: './enregistre.component.html',
  styleUrl: './enregistre.component.css'
})
export class ENREGISTREComponent {
  student = {
    lastName: '',
    firstName: '',
    matricule: '',
    department: '',
    level: '',
    field: ''
  };

  qrCodeUrl: string = '';  // ← URL à injecter dans le QR code

  constructor(private firestore: Firestore, private router: Router) {}

  async onSubmit() {
    const studentData = {
      lastName: this.student.lastName,
      firstName: this.student.firstName,
      matricule: this.student.matricule,
      department: this.student.department,
      level: this.student.level,
      field: this.student.field
    };

    try {
      const studentRef = doc(
        collection(
          doc(
            collection(this.firestore, this.student.department),
            this.student.level
          ),
          this.student.field || 'General'
        ),
        `${this.student.lastName}_${this.student.firstName}`
      );

      await setDoc(studentRef, studentData);

      // Encodage des données pour l'URL
      const encoded = btoa(JSON.stringify(studentData));
      // Modification ici pour utiliser votre domaine Netlify
      this.qrCodeUrl = `https://se-03-kbs1.vercel.app/affiche/${encoded}`;
      console.log(this.qrCodeUrl);
      
    } catch (error) {
      console.error('Erreur lors de l’enregistrement de l’étudiant :', error)
    }
  }
}
