/**
 * ************************************
 *
 * @module  TotalsDisplay
 * @author
 * @date
 * @description presentation component that displays the total cards and total markets
 *
 * ************************************
 */

import React from 'react';
import LabeledText from './LabeledText';

const TotalsDisplay = ({
  totalCards,
  totalMarkets,
  syncMarkets,
  synced,
}) => (
  <div className="innerbox" id="totals">
    <div>
      <LabeledText label="Total Cards" text={totalCards} />
      <LabeledText label="Total Markets" text={totalMarkets} />
    </div>
    <button id='sync' className="secondary" onClick={syncMarkets} disabled={synced}>Sync</button>
  </div>
);
export default TotalsDisplay;
