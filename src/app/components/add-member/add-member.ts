import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  teamService = inject(Teams);
  // teamId = input.required<number>();
  teamId = signal<number | null>(null)
    private route = inject(ActivatedRoute);
    router =inject(Router)


  addMemberForm = new FormGroup({
    userId: new FormControl('', [Validators.required])
  });
  error = signal<string | null>(null);

navigateToAllProject(){
      this.router.navigate(['../../projects'], { relativeTo: this.route });
}

ngOnInit(){
  this.route.paramMap.subscribe((params) => {
      const id = params.get('teamId');
      if (id) {
        this.teamId.set(parseInt(id));
      }
    });
}

  onSubmit() {
    console.log('in onsubmit');
    const userId = this.addMemberForm.value.userId!;
        console.log('userId: ',userId);
    // const {username,email,password}=this.registerForm.value;
    const user_id = Number(userId);
    if (typeof this.teamId() == 'number')
      this.teamService.addMember(this.teamId()!, user_id).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('add member successful', res);
          this.router.navigate(['/teams',this.teamId()!,'projects'])
        },
        error: (err) => {
          this.error.set('Add member failed. Please try again later.');
        },
      });
  }

}
