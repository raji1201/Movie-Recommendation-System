import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import {ElasticsearchService} from '../elasticsearch.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isConnected = false;

  form: FormGroup;
  status: string;

  private readonly INDEX = 'testmovies';
  private readonly TYPE = 'movie';

  movieResults = [];
  private queryText = '';

  constructor(private route: ActivatedRoute, private router: Router, private fbuilder: FormBuilder, private es: ElasticsearchService, private cd: ChangeDetectorRef ) {
    this.isConnected = false;
    this.queryText = '';

    this.form = fbuilder.group({
      index: '',
    });
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

  onSubmit(searchTerm:string) {
   this.queryText = searchTerm;
   console.log(searchTerm);

   this.es.fullTextSearch(
     this.INDEX,
     this.TYPE,
     this.queryText).then(
       response => {
         this.movieResults = response.hits.hits;
         console.log('response');
       }, err => {
         console.error(err);
     }).then(() => {
     console.log('Search completed!');
     }
   );
  }

  isUserLoggedIn()
  {
  	/*this.router.events.subscribe(val => {

            if (val instanceof RoutesRecognized) {

                console.log(val.state.root.firstChild.params);

            }
        });*/
  	// this.route.params.subscribe( params => console.log(params['name']) );
  		/*console.log(params);
        	if(params == {})
        		return false;
        	else
        		return true;
      	});*/
  }
}
