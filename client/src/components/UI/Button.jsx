import PropTypes from 'prop-types';

const Button = ({ text, handleClick, isDisabled, type, classes, ...rest }) => {
    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            type={type}
            className={classes}
            {...rest}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    classes: PropTypes.string,
};

Button.defaultProps = {
    handleClick: () => { },
    isDisabled: false,
    type: 'button',
    classes: '',
};

export default Button;
