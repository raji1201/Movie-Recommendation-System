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
export class NavComponent implements OnInit {

  currUser = '';
  isConnected = false;

  form: FormGroup;
  status: string;

  private readonly INDEX = 'testmovies';
  private readonly TYPE = 'movie';

  movieResults = [];
  private queryText = '';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fbuilder: FormBuilder, private es: ElasticsearchService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
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

  onSubmit(searchTerm:string) {
   this.queryText = searchTerm;
   this.es.fullTextSearch(
     this.INDEX,
     this.TYPE,
     this.queryText).then(
       response => {
         this.movieResults = response.hits.hits;

         this.userService.movies = this.movieResults;
         for (let i = 0; i < this.movieResults.length; i++) {
           this.movieResults[i] = this.movieResults[i]._source.name;
         }

         this.queryText = '';
         this.router.navigate(['/results']);
       }, err => {
         console.error(err);
     }).then(() => {
     console.log('Search completed!');

     }
   );
  }
}
