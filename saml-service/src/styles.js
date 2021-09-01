import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'left',
        background: '#f5f2f2',
        height: '100vh',
    },
    content: {
        textAlign: 'left',
        background: '#ffdc7a',
        height: '50vh',
        width: '55%',
        top: '15%',
        position: 'relative',
        verticalAlign: 'flex',
        display:'flex'

    },
    headerImage:{
        position: 'relative',
        height:'90px',
    },
    logo:{
        height:'94%',
        position: 'relative',
        width: '94%',
        padding: '4%',
    },
    label: {
        fontSize: '20px',
        width: '100%',
        fontWeight: '100',
    },
    formDiv:{
        padding: '2%',
    },
    form: {
        display: 'inline-block',
        position: 'relative',
        height:'95%',
        marginBottom:'5px'
    },
    textField: {
        display: 'inline-block',
        marginTop:'15px'
    },
    submit:{
        bottom: '10%',
        background:'#2e3f58',
        color:'white',
        position: 'absolute',
        right: '0',
        width:'30%',
        '&:hover': {
            backgroundColor: 'rgb(228, 87, 133)',
            borderColor: 'rgb(228, 87, 133)',
            boxShadow: 'none',
        },
    },
    table: {
        minWidth: 650,
    },
}));

export default useStyles;
