
import { Injectable } from '@angular/core';
import { Events, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';



export enum ConnectionStatusEnum {
  Online,
  Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;
  isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }


  constructor(public network: Network,
    public eventCtrl: Events,

    public alertCtrl:AlertController) {
    console.log('Hello NetworkProvider Provider');
  }



  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Online) {
            this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
            this.eventCtrl.publish('network:online');
        }
        this.previousStatus = ConnectionStatusEnum.Online;
    });
}
}
