/**
 * File name : app.component.ts
 * @author Raji Sundararajan
 */

import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent is the root component of the application.
 */
export class AppComponent {

	/** Title of the app is set. */
	title = 'Movie Recommendation Engine';
}