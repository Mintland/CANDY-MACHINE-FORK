import { GatewayProvider } from '@civic/solana-gateway-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import React from 'react'
import ReactDOM from 'react-dom';
import { CandyMachineAccount, CANDY_MACHINE_PROGRAM } from '../candy-machine';
import { sendTransaction } from '../connection';
import { MintButton } from './MintButton';


interface Props {
    setIsMinting: (val: boolean) => void;
    isUserMinting: boolean;
    isActive: boolean;
    candyMachine: CandyMachineAccount | undefined;
    wallet: WalletContextState;
    network: WalletAdapterNetwork;
    rpcUrl: string;
    connection: any;
    onMint: () => Promise<void>;
}

const connectWalletButtonRoot = document.getElementById('mint-button');


export class MintContainer extends React.Component<Props> {
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

    renderChildren = () => {
        const { setIsMinting, isUserMinting, isActive, candyMachine, wallet, network, rpcUrl, connection, onMint } = this.props;
        // const { isUserMinting } = this.state;
        return candyMachine?.state.isActive &&
            candyMachine?.state.gatekeeper &&
            wallet.publicKey &&
            wallet.signTransaction ? (
            <GatewayProvider
                wallet={{
                    publicKey:
                        wallet.publicKey ||
                        new PublicKey(CANDY_MACHINE_PROGRAM),
                    //@ts-ignore
                    signTransaction: wallet.signTransaction,
                }}
                gatekeeperNetwork={
                    candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                }
                clusterUrl={
                    network === WalletAdapterNetwork.Devnet
                        ? 'https://api.devnet.solana.com'
                        : rpcUrl
                }
                handleTransaction={async (transaction: Transaction) => {
                    // setIsUserMinting(true);
                    const userMustSign = transaction.signatures.find(sig =>
                        sig.publicKey.equals(wallet.publicKey!),
                    );
                    if (userMustSign) {
                        // setAlertState({
                        //     open: true,
                        //     message: 'Please sign one-time Civic Pass issuance',
                        //     severity: 'info',
                        // });
                        try {
                            transaction = await wallet.signTransaction!(
                                transaction,
                            );
                        } catch (e) {
                            // setAlertState({
                            //     open: true,
                            //     message: 'User cancelled signing',
                            //     severity: 'error',
                            // });
                            // setTimeout(() => window.location.reload(), 2000);
                            // setIsUserMinting(false);
                            throw e;
                        }
                    } else {
                        // setAlertState({
                        //     open: true,
                        //     message: 'Refreshing Civic Pass',
                        //     severity: 'info',
                        // });
                    }
                    try {
                        await sendTransaction(
                            connection,
                            wallet,
                            transaction,
                            [],
                            true,
                            'confirmed',
                        );
                        // setAlertState({
                        //     open: true,
                        //     message: 'Please sign minting',
                        //     severity: 'info',
                        // });
                    } catch (e) {
                        // setAlertState({
                        //     open: true,
                        //     message:
                        //         'Solana dropped the transaction, please try again',
                        //     severity: 'warning',
                        // });
                        console.error(e);
                        // setTimeout(() => window.location.reload(), 2000);
                        // setIsUserMinting(false);
                        throw e;
                    }
                    await onMint();
                }}
                broadcastTransaction={false}
                options={{ autoShowModal: false }}
            >
                <MintButton
                    candyMachine={candyMachine}
                    isMinting={isUserMinting}
                    setIsMinting={setIsMinting}
                    onMint={onMint}
                    isActive={
                        isActive
                        // (isPresale && isWhitelistUser && isValidBalance)
                    }
                />
            </GatewayProvider>
        ) : (
            <MintButton
                candyMachine={candyMachine}
                isMinting={isUserMinting}
                setIsMinting={setIsMinting}
                // setIsMinting={val => setIsUserMinting(val)}
                onMint={onMint}
                isActive={
                    isActive
                }
            />
        )
    }

    render(): React.ReactNode {
        return ReactDOM.createPortal(
            this.renderChildren(),
            this.el,
        )
    }
}