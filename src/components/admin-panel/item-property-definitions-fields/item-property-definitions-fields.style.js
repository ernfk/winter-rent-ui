const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '200px',
  },
  button: {
    margin: '0px 5px',
  },
  clearButton: {
    backgroundColor: '#AA4139',
    '&:hover': {
      backgroundColor: '#D4726A',
    },
    margin: '0px 5px',
  },
  icon: {
    margin: '0px 5px',
  },
  fieldsGrid: {
    display: 'grid',
    gridColumnGap: '40px',
    gridTemplateColumns: '200px 250px',
  },
  errorLabel: {
    color: 'red',
  },
  paperRoot: {
    width: '250px',
    height: '250px',
    marginTop: '25px',
  },
  noPhotoPlaceHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  formContainer: {
    display: 'flex',
  },
};

export default styles;
