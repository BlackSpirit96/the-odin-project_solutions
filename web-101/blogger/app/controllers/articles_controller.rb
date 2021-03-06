class ArticlesController < ApplicationController

    include ArticlesHelper
  
  def index
    @articles = Article.all
    
    respond_to do |format|
      format.html
      format.xml { render :xml => @articles.to_xml }
    end
    
  end
  
  def top
    @articles = Article.order(views: :desc).first(3)
  end
  
  
  def show
    @article = Article.find(params[:id])
    @article.increment_views
    @article.save
    
    @comment = Comment.new
    @comment.article_id = @article.id
  end
  
  def new
    @article = Article.new
  end
  
  def create
    @article = Article.new(article_params)
    @article.views = 0
    @article.save
    
    flash.notice = "The Article '#{@article.title}' have been created!"
    
    redirect_to article_path(@article)
  end
  
  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    
    flash.notice = "The article have beed destroyed successfully!"
    
    redirect_to articles_path
  end
  
  def edit
    @article = Article.find(params[:id])
  end
  
  def update
    @article = Article.find(params[:id])
    @article.update(article_params)
    
    flash.notice = "Article '#{@article.title}' have been updated!"
    
    redirect_to article_path(@article)
  end
  
end
