'use client'

import { createContext, useContext, PropsWithChildren, useState } from 'react'

interface ModalContextProps {
  isCreateTaskModalOpen: boolean;
  isViewTaskModalOpen: boolean;
  openCreateTaskModal: () => void;
  openViewTaskModal: () => void;
  closeCreateTaskModal: () => void;
  closeViewTaskModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context;
}

interface ModalProviderProps extends PropsWithChildren { }

export function ModalProvider({ children }: ModalProviderProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false)

  const openCreateTaskModal = () => setIsCreateTaskModalOpen(true)
  const closeCreateTaskModal = () => setIsCreateTaskModalOpen(false)

  const openViewTaskModal = () => setIsViewTaskModalOpen(true)
  const closeViewTaskModal = () => setIsViewTaskModalOpen(false)

  return (
    <ModalContext.Provider
      value={{
        isCreateTaskModalOpen,
        isViewTaskModalOpen,
        openCreateTaskModal,
        closeCreateTaskModal,
        openViewTaskModal,
        closeViewTaskModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}