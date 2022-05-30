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
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
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
            <ConnectButton>Connect Wallet</ConnectButton>,
            this.el,
        )
    }
}