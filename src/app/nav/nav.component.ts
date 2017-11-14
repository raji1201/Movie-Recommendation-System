import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

/**
 * NavComponent implements the Navigation Bar feature.
 */
export class NavComponent implements OnInit {

  /** Stores the username of the logged in user. */
  currUser = '';
  /** Stores the status of the elasticserch server. */
  isConnected = false;

  form: FormGroup;
  status: string;

  /** Setting parameters for elasticsearch. */
  private readonly INDEX = 'testmovies';
  private readonly TYPE = 'movie';
  
  /** Stores the results of the movie search. */
  movieResults = [];

  /** Stores the search movie name. */
  private queryText = '';

  /**
   * Constructor provides Router, ActivatedRoute, FormBuilder, ElasticsearchService, ChangeDetectorRef and UserService on object instantiation.
   * @constructor
   * @param {Router} router
   * @param {UserService} userService
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fBuilder
   * @param {ElasticsearchService} es
   * @param {ChangeDetectorRef} cd
   */
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fbuilder: FormBuilder, private es: ElasticsearchService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    /** On intialization, checks if the user is logged in and then checks if the ES server is running. */
    this.isUserLoggedIn();
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  /**
   * On page intialization, getCurrUser function of UserService is called to check if a user is logged in.
   * @return {boolean}
   */
  isUserLoggedIn()
  {
    if(this.userService.getUserLoggedIn())
    {
      this.currUser = this.userService.getCurrUser();
      return true;
    }
    else
      return false;
  }

  /**
   * On submit, the searchTerm is search for in the ES database.
   * @param {string} searchTerm
   */
  onSubmit(searchTerm:string) {
   this.queryText = searchTerm;
   this.es.fullTextSearch(
     this.INDEX,
     this.TYPE,
     this.queryText).then(
       response => {

         /** Gets all the results and stores it in movieResults. */
         this.movieResults = response.hits.hits;

         /** movies array of UserServices holds all the results. */
         this.userService.movies = this.movieResults;
         for (let i = 0; i < this.movieResults.length; i++) {
           this.movieResults[i] = this.movieResults[i]._source.name;
         }

         /** queryText is reset. */
         this.queryText = '';

         /** Navigate to results page to display results. */
         this.router.navigate(['/results']);

       }, err => {
         console.error(err);
     }).then(() => {
     console.log('Search completed!');
   });
  }
}