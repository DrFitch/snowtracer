/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvalancheService } from './avalanche.service';

describe('Service: Avalanche', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvalancheService]
    });
  });

  it('should ...', inject([AvalancheService], (service: AvalancheService) => {
    expect(service).toBeTruthy();
  }));
});
