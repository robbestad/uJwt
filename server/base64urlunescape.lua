function base64urlunescape (str)
    local newstr = str
    newstr = newstr:gsub("(_)", "/")
    newstr = newstr:gsub("(-)", "+")
    return newstr
end
return base64urlunescape

