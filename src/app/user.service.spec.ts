import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to set username', inject([UserService], (service: UserService) => {
   
    service.username = 'Jack';
    
    
    expect(service.username).toBe('Jack');
  }));

  it('should return username of user who has logged in', inject([UserService], (service: UserService) => {
    
     service.username = 'Jack';
     
     
     expect(service.getCurrUser()).toBe('Jack');
   }));

   it('should return null if name  of user is not populated', inject([UserService], (service: UserService) => {
    
     service.username = '';
     
     
     expect(service.getCurrUser()).toBe('');
   }));
});
