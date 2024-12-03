import { animate, AUTO_STYLE, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const DEFAULT_DURATION = 300;
interface messenger {
  profileurl: string,
  name: string, role:
  string,
  type: string,
  id: number
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ]),
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MessagesComponent {
  inwdith = window.innerWidth / 415
  activetabCount: any
  constructor() {
    console.log(Math.floor(this.inwdith), 'inwdith');
    this.activetabCount = Math.floor(this.inwdith)


  }
  // Control visibility of the boxes
  isContactBoxVisible: boolean = false;
  contactBoxVisibility: string = 'hidden';

  isChatBoxVisible: boolean = false;
  chatBoxVisibility: string = 'hidden';
  collapse: boolean = true;

  newMessage: string = ''; // Bind the input field
  activeChats: any[] = [];
  messengers = [
    { profileurl: '../assets/img/user.png', name: 'Senthur', role: 'Developer', type: 'send', id: 1 },
    { profileurl: '../assets/img/avatars/profile.png', name: 'Murugan', role: 'Super Admin', type: 'receive', id: 2 },
    { profileurl: '../assets/img/background_profile.png', name: 'Sathish', role: 'Admin', type: 'receive', id: 3 },
    { profileurl: '../assets/img/user.png', name: 'Shobhana', role: 'Developer', type: 'send', id: 4 },
    { profileurl: '../assets/img/avatars/profile.png', name: 'Thaniya', role: 'Developer', type: 'send', id: 5 },
    { profileurl: '../assets/img/user.png', name: 'Vignesh', role: 'Developer', type: 'receive', id: 6 },
    { profileurl: '../assets/img/background_profile.png', name: 'Akash', role: 'Developer', type: 'receive', id: 7 },
    { profileurl: '../assets/img/user.png', name: 'Simha', role: 'UI/UX Developer', type: 'send', id: 8 },
  ];


  // Toggle the visibility of both Contact and Chat box
  toggleContactBox(): void {
    if (this.isContactBoxVisible) {
      this.isContactBoxVisible = false;
      this.contactBoxVisibility = 'hidden';
      this.activeChats = []
    } else {
      this.isContactBoxVisible = true;
      this.contactBoxVisibility = 'visible';
    }
    // Ensure the chat box is hidden when the contact box is shown
    this.collapse = true
  }

  // Open the chat box when a contact is clicked
  openChatBox(messager: messenger): void {

    this.collapse = true

    const existingChatIndex = this.activeChats.findIndex(chat => chat.id === messager.id);

    if (existingChatIndex !== -1) {
      this.activeChats.splice(existingChatIndex, 1);
    }
    this.activeChats.push({
      id: messager.id,
      Userdata: messager, messagelist: [
        { text: 'This is my message.', time: '12:00', type: 'send' },
        { text: 'This is my message.', time: '12:00', type: 'receive' },
        { text: 'This is my message.', time: '12:00', type: 'receive' },
        { text: 'This is my message.', time: '12:00', type: 'send' },
        { text: 'This is my message.', time: '12:00', type: 'send' },
        { text: 'This is my message.', time: '12:00', type: 'receive' },
        { text: 'This is my message.', time: '12:00', type: 'receive' },
        { text: 'This is my message.', time: '12:00', type: 'send' },
      ]
    });

    console.log(this.activeChats);

  }

  // Close the chat box
  closeChatBox(i: number): void {
    this.activeChats.splice(i, 1);
  }

  // Send a new message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        text: this.newMessage,
        time: new Date().toLocaleTimeString(),
        type: 'send',
      };
      // this.messages.push(message); // Add the new message to the messages array
      this.newMessage = ''; // Clear the input field
    }
  }

  toggleSearchBox() {
    this.collapse = !this.collapse
  }
}
