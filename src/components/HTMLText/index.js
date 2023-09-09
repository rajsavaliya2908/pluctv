import React from 'react';
import {Text} from 'react-native';
import {Label} from '../index';
import externalStyle from '../Cards/externalStyle';
import sanitizeHtml from 'sanitize-html';

export default function HTMLText(props) {
    const {html, maxLine = 3} = props;
    const clean = sanitizeHtml(html,{
      allowedTags: [],
      allowedAttributes: {}
    });
    return (
        <Text style={externalStyle.description} numberOfLines={maxLine}>
            {clean}
        </Text>
    );
}
