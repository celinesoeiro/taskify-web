'use client';

import { useState, useEffect, useRef, ReactNode } from 'react'

interface TabsProps {
  tabs: {
    label: string;
    content: ReactNode;
  }[]
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState({
    currentTab: 1,
    numberTabs: 2
  })

  const wrapperRef = useRef(null)

  const handleKeyDown = (e: { keyCode: number; target: any; }) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current) {
        if (
          selectedTab.currentTab >= 1 &&
          selectedTab.currentTab < selectedTab.numberTabs
        ) {
          setSelectedTab({
            ...selectedTab,
            currentTab: selectedTab.currentTab + 1,
          })
        } else {
          setSelectedTab({
            ...selectedTab,
            currentTab: 1,
          })
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current) {
        if (
          selectedTab.currentTab > 1 &&
          selectedTab.currentTab <= selectedTab.numberTabs
        ) {
          setSelectedTab({
            ...selectedTab,
            currentTab: selectedTab.currentTab - 1,
          })
        } else {
          setSelectedTab({
            ...selectedTab,
            currentTab: selectedTab.numberTabs,
          })
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  return (
    <div className='shadow-retro'>
      <ul
        className='flex items-center border border-black'
        role="tabs"
        ref={wrapperRef}
      >
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={`flex-1 text-center border border-black hover:bg-violet-400 active:hover:bg-violet-400 ${selectedTab.currentTab === index + 1 ? 'bg-violet-400' : ''}`}
            aria-posinset={index + 1}
            aria-setsize={tabs.length}
            role="tabs-gather"
          >
            <button
              role="tab"
              id="tab-label-1"
              className='inline-flex py-2 px-4 text-xl font-semibold hover:bg-violet-400 border-none focus:ring-0 focus-within:ring-0 focus-visible:ring-0 w-full justify-center'
              onClick={() => setSelectedTab({ ...selectedTab, currentTab: index + 1 })}
              tabIndex={Number(`${selectedTab.currentTab === index + 1 ? "0" : "-1"}`)}
              aria-controls="tab-panel-1"
              aria-selected={Boolean(`${selectedTab.currentTab === index + 1 ? "true" : "false"}`)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className='border-b-2 border-l-2 border-r-2 border-black p-4'>
        {tabs.map((tab, index) => (
          <div key={tab.label}>
            {index + 1 === selectedTab.currentTab && (
              <>
                {tab.content}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
