package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "fmt"
    "path/filepath"

    "github.com/google/uuid" // To generate random file names
)

type UploadResponse struct {
    data []string
}

func SaveFileHandler(c *gin.Context) {
    form, _ := c.MultipartForm()
    files := form.File["file[]"]

    data := make([]string, len(files))
    

    for i, file := range files {
        // Retrieve file information
        extension := filepath.Ext(file.Filename)
        // Generate random file name for the new uploaded file so it doesn't override the old file with same name
        newFileName := uuid.New().String() + extension

        if err := c.SaveUploadedFile(file, "./static/assets/" + newFileName); err != nil {
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
                "message": "Unable to save the file",
            })
            return
        }
        data[i] = "/assets/" + newFileName

    }
    response := struct{data []string}{ data: data }
    c.JSON(http.StatusOK, gin.H{
        "data": data,
    })
}