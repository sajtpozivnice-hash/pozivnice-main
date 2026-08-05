"use client";

import { createContext, useContext, ReactNode } from "react";

type InvitationProjectContextType = {
  projectId: string | null;
};

const InvitationProjectContext =
  createContext<InvitationProjectContextType>({
    projectId: null,
  });

export function InvitationProjectProvider({
  projectId,
  children,
}: {
  projectId?: string | null;
  children: ReactNode;
}) {
  return (
    <InvitationProjectContext.Provider
      value={{ projectId: projectId ?? null }}
    >
      {children}
    </InvitationProjectContext.Provider>
  );
}

export function useInvitationProject() {
  return useContext(InvitationProjectContext);
}
