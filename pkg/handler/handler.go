package handler

import (
	"net/http"
	"rest-server/pkg/service"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

type Article struct {
}

func (Article) String() string {
	return "article"
}

// Конструктор для внедрения зависимости сервисов
func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

// Инициализация маршрутов
func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.Use(CORS)

	router.Use(static.Serve("/", static.LocalFile("./web/build", true)))

	task := router.Group("/task")
	{
		task.POST("/new", h.newTask)
		task.GET("/get", h.getTasks)
		task.DELETE("/:id", h.deleteTask)
		task.PUT("/:id", h.updateTask)
	}

	return router
}

func CORS(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")
	c.Header("Access-Control-Allow-Credentials", "true")
	c.Header("Content-Type", "application/json")

	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}
