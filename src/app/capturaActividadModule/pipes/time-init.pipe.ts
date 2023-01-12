import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInit'
})
export class TimeInitPipe implements PipeTransform {

  transform(timeStamp: number): string {
    
    if (timeStamp === 0) {
      return '00:00:00';
    }else{
      return new Date(timeStamp).toLocaleTimeString();
    }
    
    
  }

}
