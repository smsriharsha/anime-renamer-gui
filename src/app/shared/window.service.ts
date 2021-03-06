import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  directory = new BehaviorSubject<string>('');
  videos = new BehaviorSubject<any[]>([]);
  animelist = new BehaviorSubject<any[]>([{'seriesName':'pls..Wait','banner':'/banners/posters/78857-1.jpg','overview':'Loading','id': '126'}]);
  animename;
  seriesidobs = new BehaviorSubject<number>(0);
  pythonres= new BehaviorSubject<string>('');

  constructor() {
    electron.ipcRenderer.on('selecteddir', (event, location) => {
      this.directory.next(location);
    });

    electron.ipcRenderer.on('functionres', (event, pyres) => {
      this.pythonres.next(pyres);
    });

    electron.ipcRenderer.on('getvalidvideo', (event, validvideos) => {
      this.videos.next(JSON.parse(validvideos));
    });

    electron.ipcRenderer.on('animelist', (event, anime) => {
      this.animelist.next(JSON.parse(anime));
    });
    electron.ipcRenderer.on('seriesid', (event, id) => {
      console.log(id);
      this.seriesidobs.next(id);
    });

  }

  opendialog(seriesid) {
    electron.ipcRenderer.send('opendialog',seriesid);
  }

  selectanime(animename) {
    electron.ipcRenderer.send('openselector',animename);
  }

  sendid(seriesid) {
    electron.ipcRenderer.send('id',seriesid);
    }

    prepare(seriesid){
      electron.ipcRenderer.send('prepare',seriesid);
    }
    remove(input){
      electron.ipcRenderer.send('remover',input);
    }
    rename(seriesid) {
      electron.ipcRenderer.send('rename',seriesid);
    }
    organize(seriesid) {
      electron.ipcRenderer.send('organize',seriesid);
    }
    download(seriesid) {
      electron.ipcRenderer.send('download',seriesid);
    }



}
