import React from "react";
import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="claim-badge" style={{ backgroundColor: "#eef", padding: "12px", margin: "8px" }}>
      <h4>Claim Ticket #{claim.id}</h4>
      <p>Item ID: {claim.itemId}</p>
      <p>Claimed On: {claim.claimedAt.toLocaleDateString()}</p>
      {claim.notes && <p>Notes: {claim.notes}</p>}
      {children}
    </div>
  );
};

export default ClaimBadge;