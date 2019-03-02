const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
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
    gridTemplateColumns: '200px 200px',
  },
  errorLabel: {
    color: 'red',
  },
});

export default styles;
