import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setFlash } from "@/actions/ui";

export function useAuthorization(resource, id, callback = null) {
  const dispatch = useDispatch();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios.get(`/web_api/authorize/${resource}/${id}`, {
      headers: {'Accept': 'application/json'}
    }).then(res => {
      setAuthorized(res.data.authorized);
      setIsAuthorizing(false);
      if (callback) callback(res.data.authorized);
    }).catch(err => {
      setIsAuthorizing(false);
      (err.response.status === 500) ?
        dispatch(setFlash({server: 'A server error has occurred.'}, 'error'))
        : dispatch(setFlash(err.response.data.errors, 'error'));
    });
  }, [resource, id]);

  return [isAuthorizing, authorized];
}