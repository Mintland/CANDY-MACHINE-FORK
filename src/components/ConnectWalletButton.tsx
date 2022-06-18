import React from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';

interface Props {
    children: React.ReactNode
}

const connectWalletButtonRoot = document.getElementById('connect-wallet-button');

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  background: #fbf43f;
  color: #77003d;
  font-size: 18px;
  text-align: center!important;
  justify-content: center;
  font-weight: bold;
  border: 3px solid #000;
  &:hover{
      background: #e1d90f;
  }
`;


export class ConnectWalletButton extends React.Component {
    private el: HTMLDivElement;
    constructor(props: Props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        connectWalletButtonRoot?.appendChild(this.el);
    }

    componentWillUnmount() {
        connectWalletButtonRoot?.removeChild(this.el);
    }


    render(): React.ReactNode {
        return ReactDOM.createPortal(
            <ConnectButton>
                Connect Wallet
            </ConnectButton>,
            this.el,
        )
    }
}