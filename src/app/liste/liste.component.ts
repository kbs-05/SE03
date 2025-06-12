import { Component, OnInit } from '@angular/core';
import { Firestore, collectionGroup, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-liste',
  standalone: false,
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class LISTEComponent implements OnInit {
  students: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    try {
      const querySnapshot = await getDocs(collectionGroup(this.firestore, 'General'));
      this.students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        department: doc.ref.parent.parent?.parent?.id,
        level: doc.ref.parent.parent?.id
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
}