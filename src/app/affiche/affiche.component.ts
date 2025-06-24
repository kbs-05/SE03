import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

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
    const studentRef = doc(
      collection(
        doc(
          collection(this.firestore, this.studentData.department),
          this.studentData.level
        ),
        this.studentData.field || 'General'
      ),
      `${this.studentData.lastName}_${this.studentData.firstName}`
    );

    await updateDoc(studentRef, {
      status: status,
    });

    this.status = status;
    alert(`Statut marqué : ${status}`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut :', error);
  }
}

async markAllAbsent() {
  try {
    const studentsCollectionRef = collection(
      doc(
        collection(this.firestore, this.studentData.department),
        this.studentData.level
      ),
      this.studentData.field || 'General'
    );

    const snapshot = await getDocs(studentsCollectionRef);

    const batchUpdates: Promise<void>[] = [];

    snapshot.forEach((studentDoc) => {
      const data = studentDoc.data() as any;

      // Marquer absent si non déjà présent
      if (!data.status || data.status !== 'Présent') {
        const studentRef = doc(studentsCollectionRef, studentDoc.id);

        batchUpdates.push(updateDoc(studentRef, {
          status: 'Absent',
          heure: '2h',
        }));
      }
    });

    await Promise.all(batchUpdates);
    alert('Tous les absents ont été marqués avec 2h d’absence.');
  } catch (error) {
    console.error('Erreur lors du marquage des absents :', error);
  }
}

}