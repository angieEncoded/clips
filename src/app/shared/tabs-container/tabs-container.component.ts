import { TagContentType } from '@angular/compiler';
import { Component, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';





@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit{

    @ContentChildren(TabComponent) tabs?: QueryList<TabComponent> = new QueryList()

  ngAfterContentInit(): void {
    // this.tabs?.filter()

    // console.log(this.tabs)
    const activeTabs = this.tabs?.filter(
      tab => tab.active
    )

    if(!activeTabs || activeTabs.length === 0){
      this.selectTab(this.tabs!.first)
    }

  }

  selectTab(tab: TabComponent){
    // turn all the tabs off first
    this.tabs?.forEach(tab => {
      tab.active = false;
    })
    tab.active = true

    return false;
}


  
}
