import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  // Control visibility of the boxes
  isContactBoxVisible: boolean = false;
  contactBoxVisibility: string = 'hidden';

  isChatBoxVisible: boolean = false;
  chatBoxVisibility: string = 'hidden';

  newMessage: string = ''; // Bind the input field

  messengers = [
    { profileurl: '../assets/img/user.png', name: 'Senthur', role: 'Developer', type: 'send' },
    { profileurl: '../assets/img/avatars/profile.png', name: 'Murugan', role: 'Super Admin', type: 'receive' },
    { profileurl: '../assets/img/background_profile.png', name: 'Sathish', role: 'Admin', type: 'receive' },
    { profileurl: '../assets/img/user.png', name: 'Shobhana', role: 'Developer', type: 'send' },
    { profileurl: '../assets/img/avatars/profile.png', name: 'Thaniya', role: 'Developer', type: 'send' },
    { profileurl: '../assets/img/user.png', name: 'Vignesh', role: 'Developer', type: 'receive' },
    { profileurl: '../assets/img/background_profile.png', name: 'Akash', role: 'Developer', type: 'receive' },
    { profileurl: '../assets/img/user.png', name: 'Simha', role: 'UI/UX Developer', type: 'send' },
  ];

  messages = [
    { text: 'This is my message.', time: '12:00', type: 'send' },
    { text: 'This is my message.', time: '12:00', type: 'receive' },
    { text: 'This is my message.', time: '12:00', type: 'receive' },
    { text: 'This is my message.', time: '12:00', type: 'send' },
    { text: 'This is my message.', time: '12:00', type: 'send' },
    { text: 'This is my message.', time: '12:00', type: 'receive' },
    { text: 'This is my message.', time: '12:00', type: 'receive' },
    { text: 'This is my message.', time: '12:00', type: 'send' },
  ];

  // Toggle the visibility of both Contact and Chat box
  toggleContactBox(): void {
    if (this.isContactBoxVisible) {
      this.isContactBoxVisible = false;
      this.contactBoxVisibility = 'hidden';
    } else {
      this.isContactBoxVisible = true;
      this.contactBoxVisibility = 'visible';
    }
    // Ensure the chat box is hidden when the contact box is shown
    this.closeChatBox();
  }

  // Open the chat box when a contact is clicked
  openChatBox(): void {
    this.isChatBoxVisible = true;
    this.chatBoxVisibility = 'visible';
  }

  // Close the chat box
  closeChatBox(): void {
    this.isChatBoxVisible = false;
    this.chatBoxVisibility = 'hidden';
  }

  // Send a new message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        text: this.newMessage,
        time: new Date().toLocaleTimeString(),
        type: 'send',
      };
      this.messages.push(message); // Add the new message to the messages array
      this.newMessage = ''; // Clear the input field
    }
  }
}
