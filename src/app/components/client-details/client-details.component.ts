import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service'

import { FlashMessagesService } from 'angular2-flash-messages'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { Client } from '../../models/Client'

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string
  client: Client
  hasBalance: boolean = false
  showBalanceUpdateInput: boolean = false

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    //GET ID
    this.id = this.route.snapshot.params['id']
    
    //GET CLient
    this.clientService.getClient(this.id).subscribe(client => {
      if(client.balance > 0 ){
        this.hasBalance = true
      }
      this.client = client
    });
  }

  updatedBalance(id: string){
    //Update client
    this.clientService.updateClient(this.id, this.client)
    this.flashMessagesService.show('Balanced atualizado com sucesso', {cssClass: 'alert-success', timeout: 4000})
    this.router.navigate(['/client/'+this.id])
  }

  oneDeleteClick(){
    if(confirm("Deseja excluir esse cliente?")){
      this.clientService.deleteClient(this.id)
      this.flashMessagesService.show('Cliente atualizado com sucesso', {cssClass: 'alert-success', timeout: 4000})
      this.router.navigate(['/'])
    }
  }

}
