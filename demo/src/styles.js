import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
    root: {
        display: 'block',
        flexWrap: 'wrap',
        textAlign: 'left',
    },
    app: {
        textAlign: 'left',
        height: '100vh',
    },
    content: {
        textAlign: 'center',
        height: '90vh',
        width: '25%',
        left: '30%',
        top: '5%',
        position: 'relative',
        paddingLeft: '3%',
        paddingRight: '4%',
        verticalAlign: 'flex'

    },
    topBanner: {
        width: '88%',
        display: 'block'
    },
    signInLabel: {
        fontSize: '20px',
        marginTop: '10px',
        marginBottom: '15px',
        fontWeight: '500'
    },
    field: {
        fontSize: '14px',
        marginTop: '10px',
        marginBottom: '10px',
        color: "black"
    },
    textField: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
    },
    table: {
        width: '100%',
    },
    formButton: {
        margin: '5% 0%',
        width: '100%',
    },
}));

export default useStyles;
