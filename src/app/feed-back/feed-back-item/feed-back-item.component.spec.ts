import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackItemComponent } from './feed-back-item.component';

describe('FeedBackItemComponent', () => {
  let component: FeedBackItemComponent;
  let fixture: ComponentFixture<FeedBackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedBackItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedBackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
