import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
// import styled from 'styled-components';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';


export const ReferralCodeTextField = styled((props: TextFieldProps) => (
    <TextField
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        border: '4px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


interface ReferralCodeInputProps {

}

export const ReferralCodeInput = ({ }) => {
    return <Box><ReferralCodeTextField label="Referral Code" variant="outlined" /></Box>
}