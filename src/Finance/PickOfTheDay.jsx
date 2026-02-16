import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import {useRef, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import FinnHub from "../api/FinnHub";

function PickOfTheDay ()  {
        const [quote, setQuote] = React.useState(null);
}

export default PickOfTheDay;