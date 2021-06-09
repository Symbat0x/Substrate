import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetBlockList } from '../../../store/actions';

import { hexToDecimal } from '../../../../shared/modules/conversion.utils';
import Button from '../../ui/button';

const BlockList = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.metamask.blocks);
  const [isDisplayNumberAsDecimal, setDisplayNumberAsDecimal] = useState(false);

  return (
    <div className="block-list">
      <div className="block-list__buttons">
        <Button
          type="secondary"
          rounded
          onClick={() => dispatch(resetBlockList())}
        >
          Reset Block List
        </Button>
        <Button
          type="secondary"
          rounded
          onClick={() => setDisplayNumberAsDecimal(!isDisplayNumberAsDecimal)}
        >
          {`Display numbers as ${
            isDisplayNumberAsDecimal ? 'hexadecimals' : 'decimals'
          }`}
        </Button>
      </div>
      {blocks.map((block, i) => {
        return (
          <div className="block-list__block" key={`block-${i}`}>
            <span>{`Number: ${
              isDisplayNumberAsDecimal
                ? hexToDecimal(block.number)
                : block.number
            }`}</span>
            <span>{`Hash: ${block.hash}`}</span>
            <span>{`Nonce: ${
              isDisplayNumberAsDecimal ? hexToDecimal(block.nonce) : block.nonce
            }`}</span>
            <span>{`GasLimit: ${
              isDisplayNumberAsDecimal
                ? hexToDecimal(block.gasLimit)
                : block.gasLimit
            }`}</span>
            <span>{`GasUsed: ${
              isDisplayNumberAsDecimal
                ? hexToDecimal(block.gasUsed)
                : block.gasUsed
            }`}</span>
            <span>{`Transaction Count: ${block.transactions.length}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BlockList;
